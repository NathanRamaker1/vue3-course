import { ref, watch } from "vue";

interface SettingsMap {
  general: IGeneralSettings,
  privacy: IPrivacySettings,
  notifications: INotificationsSettings
}

type SettingsKey = keyof SettingsMap

interface IGeneralSettings {
    username: string;
    email: string;
    about: string;
    gender: string;
    country: string;
}

const init = <T extends SettingsKey>(key: T, defaults: SettingsMap[T]) => {
  const stored = localStorage.getItem(key);

    return stored !== null ? JSON.parse(stored) : defaults;
};

const watcher = 
<T extends SettingsKey>(key: T) => (value: 
  SettingsMap[T]) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

const general = ref<IGeneralSettings>(
  init('general', {
    about: '',
    country: 'USA',
    gender: 'male',
    email: '',
    username: ''
  })
);

watch(general, watcher('general'), {deep: true});

interface INotificationsSettings {
  email: boolean;
  sms: boolean;
}

const notifications = ref<INotificationsSettings>(
  init('notifications', {
    email: false,
    sms: false
  })
);

watch(notifications, watcher('notifications'), {deep: true});

interface IPrivacySettings {
  visbility: Visbility;
  searchEngineIndexing: boolean;
}

type Visbility = 'public' | 'private';

const privacy = ref<IPrivacySettings>(
  init('privacy', {
    searchEngineIndexing: false,
    visbility: 'public'
  })
);

watch(privacy, watcher('privacy'), {deep: true});

export function useSettings() {
    return {
        general,
        notifications,
        privacy
    };
}