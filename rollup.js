/**
 * Components
 */
const path = require('path');
const { lstatSync, readdirSync } = require('fs');

const COMPONENT_DIR = './src/components';

const isDirectory = source => lstatSync(source).isDirectory();
const getComponents = source => {
  return readdirSync(source)
    .map(name => path.join(source, name))
    .filter(isDirectory);
};

const components = getComponents(COMPONENT_DIR);

/**
 * Rollup
 */
const babel = require('rollup-plugin-babel');
const rollup = require('rollup');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

const OUTPUT_JS_TYPE = 'esm';
const OUTPUT_DIR = './lib';

/**
 * CLI
 */
const chalk = require('chalk');

console.log(
  chalk.red.bgWhite(`🦄 🌈  Compiling Qantas Runway Components into optimized modules`),
  '\n'
);

/**
 * Build
 */
const inputOptions = entry => {
  return {
    input: `${entry}/index.js`,
    external: ['react'],
    plugins: [
      babel({
        exclude: 'node_modules/**'
      }),
      nodeResolve(),
      commonjs()
    ]
  };
};

const outputOptions = (name, type) => {
  name = name.replace('src\\components', ''); // windows hotfix
  return {
    file: path.resolve(__dirname, `${OUTPUT_DIR}/${name}/index.js`),
    name: name,
    format: type
  };
};

async function build(entrySrc, name, type) {
  try {
    const bundle = await rollup.rollup(inputOptions(entrySrc, type));
    await bundle.write(outputOptions(name, type));
    console.log(chalk.green(` ✅  Successuly packaged ${name} 📦`));
  } catch (e) {
    console.log(chalk.red(` ☠️  Failed to package ${name}`));
    console.log(e);
  }
}

async function generateModules() {
  for (let index = 0; index < components.length; index++) {
    let name = components[index].split('/').pop();
    console.log(chalk.cyan(` ⚙️  Now building: ${name}`));
    console.log(chalk.cyan(` 🗜  Module type: ${OUTPUT_JS_TYPE}`));
    await build(components[index], components[index].split('/').pop(), OUTPUT_JS_TYPE);
  }
}

generateModules();
