export class Utils {

    /**
     * 是否为空
     * @param value 值
     */
    static isEmpty(value: any): boolean {
        return value == null || typeof value === 'string' && value.length === 0;
    }

    /**
     * 是否不为空
     * @param value 值
     */
    static isNotEmpty(value: any): boolean {
        return !Utils.isEmpty(value);
    }

    /**
     * 是否数组
     * @param vaue 值
     */
    static isArray(value: any): boolean {
        return Array.isArray(value);
    }

    /**
     * 是否对象
     * @param vaue 值
     */
    static isObject(value: any): boolean {
        return typeof value === 'object' && !Utils.isArray(value);
    }

    /**
    * クラスをJSONに変換する。
    * @param map マップ
    */
    public static toJson(obj: any): any {
        const json: any = {};
        if (obj !== null && obj !== undefined) {
            Object.keys(obj).forEach(key => {
                if (obj[key] !== undefined) {
                    const val = obj[key];
                    if (this.isObject(val)) {
                        val.forEach((v, k) => {
                            json[k] = v;
                        });
                    } else {
                        json[key] = this.isNotEmpty(val + '') ? val : '';
                    }
                }
            });
        }

        return json;
    }
}
