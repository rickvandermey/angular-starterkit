#!/usr/bin/env bash

# Script below is based on: https://medium.freecodecamp.org/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec
# Only changes are:
# - Variable usages in case we need to change names or locations
# - Color coded instructions
# - No prompt mode for certificate request
# - Automatic addition of the rootCA to your system keychain
# - Copying of the resulting certificates to the output folder
# Only caveat is that the keychain handling is OSX specific and will not work on other operating systems

# Exit on error enabled
set -e

#Color codes used
NOCOLOR='\033[0m'
INPUTCOLOR='\033[0;36m'
OUTPUTCOLOR='\033[0;32m'

#Input files
SERVERCSRCNF='server.csr.cnf' # Server certificate config
V3EXT='v3.ext'                # Server certificate ext config

#Output files
ROOTCAKEY='rootCA.key' # RootCA private key
ROOTCAPEM='rootCA.pem' # RootCA public key
SERVERKEY='server.key' # Server certificate private key
SERVERCSR='server.csr' # Server certificate request
SERVERCRT='server.crt' # Server certificate

#Output folder
OUTPUTFOLDER='../ssl'

echo -e "${INPUTCOLOR}Generating root key, enter root certificate password:${NOCOLOR}"
    openssl genrsa -des3 -out ${ROOTCAKEY} 2048
echo -e "${OUTPUTCOLOR}${ROOTCAKEY} generated${NOCOLOR}"

echo -e "${INPUTCOLOR}Generating root certificate, enter root certificate password:${NOCOLOR}"
    openssl req -x509 -new -nodes -key ${ROOTCAKEY} -sha256 -days 1024 -out ${ROOTCAPEM} -subj "/C=NL/ST=Zuid Holland/L=Noordwijk/O=Aanzee/OU=Interactive/CN=localhost"
echo -e "${OUTPUTCOLOR}${ROOTCAPEM} generated${NOCOLOR}"

echo -e "${INPUTCOLOR}Adding ${ROOTCAPEM} to System keychain as trustedroot, enter user password if asked${NOCOLOR}"
    sudo security add-trusted-cert -d -r trustRoot -k "/Library/Keychains/System.keychain" "${ROOTCAPEM}"
echo -e "${OUTPUTCOLOR}${ROOTCAPEM} added to system keychain${NOCOLOR}"

echo -e "${INPUTCOLOR}Create certificate key for localhost, enter the data it asks${NOCOLOR}"
    openssl req -new -sha256 -nodes -out ${SERVERCSR} -newkey rsa:2048 -keyout ${SERVERKEY} -config ${SERVERCSRCNF}
echo -e "${OUTPUTCOLOR}${SERVERCSR} generated${NOCOLOR}"
echo -e "${OUTPUTCOLOR}${SERVERKEY} generated${NOCOLOR}"

echo -e "${INPUTCOLOR}Create certificate for localhost${NOCOLOR}"
    openssl x509 -req -in ${SERVERCSR} -CA ${ROOTCAPEM} -CAkey ${ROOTCAKEY} -CAcreateserial -out ${SERVERCRT} -days 500 -sha256 -extfile ${V3EXT}
echo -e "${OUTPUTCOLOR}${SERVERCRT} generated${NOCOLOR}"

echo -e "${INPUTCOLOR}Create ${OUTPUTFOLDER} folder to copy the certificates to${NOCOLOR}"
    mkdir -p "${OUTPUTFOLDER}"
echo -e "${OUTPUTCOLOR}${OUTPUTFOLDER} created${NOCOLOR}"

echo -e "${INPUTCOLOR}Copying ${SERVERCRT} to output folder${NOCOLOR}"
    cp "${SERVERCRT}" "${OUTPUTFOLDER}/${SERVERCRT}"
echo -e "${OUTPUTCOLOR}${SERVERCRT} copied${NOCOLOR}"

echo -e "${INPUTCOLOR}Copying ${SERVERKEY} to output folder${NOCOLOR}"
    cp "${SERVERKEY}" "${OUTPUTFOLDER}/${SERVERKEY}"
echo -e "${OUTPUTCOLOR}${SERVERKEY} copied${NOCOLOR}"