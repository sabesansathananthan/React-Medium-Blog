/* eslint-disable */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
configure({ adapter: new Adapter() });
