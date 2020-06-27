class ShallowChangesObserver<T extends Object> {
    private _originalObject: T;
    public readonly newObject = {} as T;
    
    constructor(object: T) {
        this._originalObject = object;
        Object.assign(this.newObject, object);
    }

    public get hasChanges(): boolean {
        for (let key in this._originalObject)
            if (this._originalObject[key] !== this.newObject[key])
                return true;
        return false;
    }

    public reset() {
        Object.assign(this.newObject, this._originalObject);
    }

    public get changes(): Partial<T> {
        const changes: Partial<T> = {};
        for (let key in this._originalObject)
            if (this._originalObject[key] !== this.newObject[key])
                changes[key] = this.newObject[key];
        return changes;
    }
}