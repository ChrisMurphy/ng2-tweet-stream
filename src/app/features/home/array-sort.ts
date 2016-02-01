import { Pipe } from "angular2/core";

import { Tweet } from '../../core/models/tweet';

@Pipe({
    name: "arraySort",
    pure: false
})
export class ArraySort {

    transform(array: Array<Tweet>, args: string): Array<Tweet> {
        if (typeof args[0] === "undefined") {
            return array;
        }

        let direction = args[0][0];
        let column = args[0].slice(1);

        array.sort((a: any, b: any) => {

            let left = Number(new Date(a[column]));
            let right = Number(new Date(b[column]));

            return (direction === "-") ? right - left : left - right;
        });

        return array;
    }
}