import React from 'react';
import renderer from 'react-test-renderer';
import {QRCodeSVG} from '..';
import {describe, expect, test} from '@jest/globals';

const BASIC_PROPS = {
  value: 'http://picturesofpeoplescanningqrcodes.tumblr.com/',
  size: 128,
  bgColor: '#ffffff',
  fgColor: '#000000',
  level: 'L',
  includeMargin: false,
};

const TEST_CONFIGS = [
  {includeMargin: true},
  {includeMargin: false},
  {level: 'L'},
  {level: 'M'},
  {level: 'Q'},
  {level: 'H'},
  {
    imageSettings: {
      src: 'https://static.zpao.com/favicon.png',
      x: undefined,
      y: undefined,
      height: 24,
      width: 24,
      excavate: true,
    },
  },
  {
    imageSettings: {
      src: 'https://static.zpao.com/favicon.png',
      x: undefined,
      y: undefined,
      height: 24,
      width: 24,
      excavate: false,
    },
  },
  {value: '1234567890'},
  {value: 'single byte emoji ✅'},
  {value: 'double byte emoji 👌'},
  {value: 'four byte emoji 👌🏽'},
  {value: '火と氷'},
  // The snapshots for these are only useful for SVG & looking at widths.
  {includeMargin: true, marginSize: 10},
  {includeMargin: true, marginSize: 0},
  {includeMargin: false, marginSize: 8},
  {includeMargin: false, marginSize: 6.5},
  {title: 'some descriptive title'},
];

describe('SVG rendering', () => {
  test('renders basic SVG correctly', () => {
    const tree = renderer.create(<QRCodeSVG {...BASIC_PROPS} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test.each(TEST_CONFIGS)('renders SVG variation (%o) correctly', (config) => {
    const tree = renderer
      .create(<QRCodeSVG {...BASIC_PROPS} {...config} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('TypeScript Support', () => {
  test('QRCodeSVG', () => {
    <QRCodeSVG {...BASIC_PROPS} className="foo" clipRule="bar" />;
    expect(0).toBe(0);
  });
});
