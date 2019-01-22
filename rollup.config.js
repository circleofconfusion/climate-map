import node from 'rollup-plugin-node-resolve';

export default {
    input: 'd3-exports.js',
    plugins: [node()],
    output: {
        file: 'd3.js',
        format: 'umd',
        name: 'd3'
    }
};