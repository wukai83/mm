/**
 * ベースコンポーネントクラスである。
 */
export class BaseComponent {
    /**
     * サービスを呼び出す。
     *
     * @param service サービスＦＵＮＣＴＩＯＮ
     * @param callback 結果処理ＦＵＮＣＴＩＯＮ
     * @param conditions サービスパラメータ
     */
    protected doService(service: Function, callback: Function, ...conditions: any[]) {
        service(conditions).subscribe(
            // コールバック
            (data: any) => callback(data),
            // エラー処理
            error => this.doErrorHanding(error),
            // 後処理
            () => this.doAfter()
        );
    }
}
