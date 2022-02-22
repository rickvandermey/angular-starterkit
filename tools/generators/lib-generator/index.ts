import {
	Tree,
	generateFiles,
	joinPathFragments,
	updateJson,
} from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';
import { wrapAngularDevkitSchematic } from '@nrwl/devkit/ngcli-adapter';

interface LibSchema {
	name: string;
	storybook?: boolean;
	generateComponent?: boolean;
	componentName?: string;
	figma?: string;
	storyTitle?: string;
}

export default async function (tree: Tree, schema: LibSchema) {
	const path = `libs/${schema.name}`;
	const libName = `${schema.name}`.replace('/', '-');

	const tsBaseConfig = tree.read('tsconfig.base.json').toString();
	const tsBasePaths = JSON.parse(tsBaseConfig).compilerOptions.paths;

	await libraryGenerator(tree, { name: schema.name });

	let files = joinPathFragments(__dirname, './files');
	if (schema.storybook) {
		files = joinPathFragments(__dirname, './files-storybook');
	}

	generateFiles(
		// virtual file system
		tree,

		// the location where the template files are
		files,

		// where the files should be generated
		path,

		// the variables to be substituted in the template
		{
			path,
			libName,
		},
	);

	if (schema.generateComponent && schema.componentName) {
		const componentFileName = `${schema.componentName}`
			.toLowerCase()
			.replace(' ', '-');

		const moduleGenerator = wrapAngularDevkitSchematic(
			'@schematics/angular',
			'module',
		);

		const componentGenerator = wrapAngularDevkitSchematic(
			'@schematics/angular',
			'component',
		);

		//Add module
		await moduleGenerator(tree, {
			name: componentFileName,
			project: libName,
			path: path + '/src/lib',
			flat: true,
		});

		//Add Component
		await componentGenerator(tree, {
			name: componentFileName,
			project: libName,
			path: path + '/src/lib',
			style: 'scss',
			flat: true,
		});

		//Add storybook files
		if (schema.storybook) {
			const figma = `${schema.figma}` || '';
			const component = `ui-${componentFileName}`;
			const storyTitle = schema.storyTitle || '';

			generateFiles(
				tree,
				joinPathFragments(__dirname, './test-vr'),
				`${path}/src/lib`,

				{
					componentFileName,
				},
			);

			generateFiles(
				tree,
				joinPathFragments(__dirname, './stories'),
				`${path}/src/lib`,

				{
					story: capitalizeFirstLetter(componentFileName),
					component,
					componentFileName,
					figma,
					storyTitle,
				},
			);
		}

		removeUselessFiles(tree, path, libName);

		updateStorybookBundleProjectJson(tree, libName);

		updateTsBaseConfig(tree, tsBasePaths);

		updateSonarQubeFile(tree, libName);
	}
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function updateStorybookBundleProjectJson(tree: Tree, libName: string) {
	updateJson(tree, 'libs/storybook-bundle/project.json', (projectJson) => {
		projectJson.implicitDependencies =
			projectJson.implicitDependencies ?? [];
		projectJson.implicitDependencies.push(libName);
		return projectJson;
	});
}

function updateTsBaseConfig(tree: Tree, tsBasePaths: object) {
	updateJson(tree, 'tsconfig.base.json', (tsconfig) => {
		tsconfig.compilerOptions.paths = tsconfig.compilerOptions.paths ?? {};
		tsconfig.compilerOptions.paths = { ...tsBasePaths };
		return tsconfig;
	});
}
function updateSonarQubeFile(tree: Tree, libName: string) {
	const currentSonarFile = tree.read('sonar-project.properties').toString();
	const eslint = `test-reports/libs/${libName}/eslint/checkstyle-result.xml`;
	const stylelint = `test-reports/libs/${libName}/stylelint/checkstyle-result.xml`;
	const result = `${currentSonarFile} ${eslint} \\ , \n ${stylelint} \\ ,`;

	tree.write('sonar-project.properties', result);
}

function removeUselessFiles(tree: Tree, path: string, libName: string) {
	if (tree.exists(`${path}/src/lib/${libName}.spec.ts`)) {
		tree.delete(`${path}/src/lib/${libName}.spec.ts`);
	}
	if (tree.exists(`${path}/src/lib/${libName}.ts`)) {
		tree.delete(`${path}/src/lib/${libName}.ts`);
	}
	if (tree.exists(`${path}/README.md`)) {
		tree.delete(`${path}/README.md`);
	}
	if (tree.exists(`${path}/.babelrc`)) {
		tree.delete(`${path}/.babelrc`);
	}
	if (tree.exists('tools/libs')) {
		tree.delete('tools/libs');
	}
	if (tree.exists(`${path}/src/index.ts`)) {
		tree.delete(`${path}/src/index.ts`);
	}
}
