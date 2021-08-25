import firebase from 'firebase/app';
import 'firebase/analytics';

export const IS_ENABLED = true;
export let App: firebase.app.App;

export const initialize = async (): Promise<firebase.analytics.Analytics | null> => {
    return new Promise((resolve) => {
        if (!IS_ENABLED || App) {
            return resolve(null);
        }
        fetch('/__/firebase/init.json').then(async (response) => {
            App = firebase.initializeApp(await response.json());
            resolve(firebase.analytics());
        });
    });
};

export const logEvent = (
    eventName: string,
    eventParams?: { [key: string]: unknown },
    options?: firebase.analytics.AnalyticsCallOptions,
): void => {
    if (!IS_ENABLED || !App) {
        return;
    }
    firebase.analytics().logEvent(eventName, eventParams, options);
};

export const setAnalyticsCollectionEnabled = (enabled: boolean): void => {
    firebase.analytics().setAnalyticsCollectionEnabled(enabled);
};

export const setCurrentScreen = (screenName: string, options?: firebase.analytics.AnalyticsCallOptions): void => {
    if (!IS_ENABLED || !App) {
        return;
    }
    firebase.analytics().setCurrentScreen(screenName, options);
};

export const setUserId = (userId: string, options?: firebase.analytics.AnalyticsCallOptions): void => {
    if (!IS_ENABLED || !App) {
        return;
    }
    firebase.analytics().setUserId(userId, options);
};

export const setUserProperties = (
    properties: firebase.analytics.CustomParams,
    options?: firebase.analytics.AnalyticsCallOptions,
): void => {
    if (!IS_ENABLED || !App) {
        return;
    }
    firebase.analytics().setUserProperties(properties, options);
};
