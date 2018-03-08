import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MockDate from 'mockdate';

const now = new Date('2017-11-27T14:33:42Z');
Date.now = jest.fn().mockReturnValue(now);

MockDate.set('2017-01-01T12:00:00Z', 0);

Enzyme.configure({ adapter: new Adapter() });
