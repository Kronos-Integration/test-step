import test from 'ava';

import { Step } from 'kronos-step';
import { stepTestStatic } from '../src/ava-step';

test(stepTestStatic, Step, {}, 'kronos-step');
