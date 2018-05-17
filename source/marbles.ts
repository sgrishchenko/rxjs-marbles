/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { Context } from "./context";

export function marbles(func: (context: Context) => any): () => any;
export function marbles<T1>(func: (context: Context, t1: T1) => any): (t1: T1) => any;
export function marbles<T1, T2>(func: (context: Context, t1: T1, t2: T2) => any): (t1: T1, t2: T2) => any;
export function marbles<T1, T2, T3>(func: (context: Context, t1: T1, t2: T2, t3: T3) => any): (t1: T1, t2: T2, t3: T3) => any;
export function marbles(func: (context: Context, ...rest: any[]) => any): (...rest: any[]) => any;
export function marbles(func: (context: Context, ...rest: any[]) => any): (...rest: any[]) => any {

    // Jasmine, Jest and Mocha need to see an explicit parameter for callbacks
    // to be passed. It's the presence of the parameter that indicates to the
    // framework that it's an asynchronous test. Not important now, but maybe
    // later if support for real-world, asynchronous marble tests is to be
    // added.

    if (func.length > 1) {
        return function (this: any, first: any, ...rest: any[]): void {

            const context = new Context();
            try {
                return func.call(this, context, first, ...rest);
            } finally {
                context.teardown();
            }
        };
    }
    return function(this: any, ...rest: any[]): any {

        const context = new Context();
        try {
            return func.call(this, context, ...rest);
        } finally {
            context.teardown();
        }
    };
}
