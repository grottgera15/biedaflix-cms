function lengthRuleFactory(message: string, maxLength = -1) {
    return function rule(s: string) {
        if (s.length === 0 || (maxLength !== -1 && s.length >= maxLength))
            return message;
        return true;
    }
}

function numericRuleFactory(message: string, min: number | null = null, max: number | null = null) {
    return function rule(s: number | string) {
        if (typeof s === 'string')
            s = parseInt(s);
        if ((min !== null && s < min) || (max !== null && s > max))
            return message;
        return true;
    }
}

function magnetLinkRuleFactory(message: string) {
    return function rule(s: string) {
        if (s.length > 0 && s.match(/magnet:\?xt=urn:btih:[a-zA-Z0-9]*/g) === null) 
            return message;
        return true;
    }
}

export { lengthRuleFactory, numericRuleFactory, magnetLinkRuleFactory};