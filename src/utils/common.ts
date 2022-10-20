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

export const validateEmail = (email: string) => {
    var validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(validRegex)) {
        return true;
    } else {
        return false;
    }
};
