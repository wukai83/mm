import { PreloadingStrategy, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';

/**
 * 可選択のプリロード戦略
 * @export
 * @class SelectivePreloadingStrategy
 * @implements {PreloadingStrategy}
 */
export class SelectivePreloadingStrategy implements PreloadingStrategy {
    preload(route: Route, load: () => Observable<any>): Observable<any> {
        if (route.data && route.data['preload']) {
            return load();
        } else {
            return Observable.of(null);
        }
    }
}
