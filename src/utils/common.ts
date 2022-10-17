export const debounce = (func: Function, delay: number = 100) => {
    let timmer: string | number | NodeJS.Timeout | undefined;
    return function () {
        // @ts-ignore: Implicit type
        const context = this;
        const args = arguments;
        clearTimeout(timmer);
        timmer = setTimeout(() => func.apply(context, args), delay);
    };
};
