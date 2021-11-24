/*
This script is used to resolve the base branch so the affected commands work correctly.
The behavior is as following:
- If it's run in a pull request pipeline the base against which the diff will be made will be the (remote) target branch of the pull request.
- If it's a deploy pipeline the environment will be used to resolve the last successful deploy commit hash.
- If you're running affected locally on a feature branch it will try to resolve to the remote feature branch and if that fails it will resolve to the iteration.
- If it's something else it will resolve to the baseBranch set in the nx.json.
 */
const { execSync } = require('child_process');

const defaultBase = require('../../nx.json').affected.defaultBase;

/**
 * Resolves the base branch and sets the config value
 *
 * @return {string}
 */
const main = () => {
	const currentBranch = getCurrentBranch();
	console.log(`Local development detected on branch: ${currentBranch}`);
	let result = defaultBase;
	// If it's a feature branch get the latest remote iteration
	if (currentBranch.includes('feature/')) {
		result = getRemoteFeature(currentBranch);
	}
	setBase(result);
};

/**
 * Tries to retrieve the remote feature branch, if not found, falls back to the remote iteration
 * @param currentBranch
 * @return {string}
 */
const getRemoteFeature = (currentBranch) => {
	const branches = execSync('git branch --list --remotes').toString();

	const regex = new RegExp(`(origin\/${currentBranch})`, 'gm');
	const matches = branches.match(regex);
	// If a remote is found use it
	if (matches && matches.length > 0) {
		return matches[matches.length - 1];
	}

	return defaultBase;
};

/**
 * Retrieves the current branch
 *
 * @return {string}
 */
const getCurrentBranch = () => execSync('git branch --show-current').toString();

/**
 * Sets the base (commit/branch) as npm config
 *
 * @param base
 * @return {Buffer}
 */
const setBase = (base) => {
	console.log(`Setting base to: ${base}`);
	console.log(execSync(`npm config set base ${base}`).toString());
};

main();
