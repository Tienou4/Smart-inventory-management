"use client";

import { SettingsHeader } from './settings-header';
import { SettingsTabs } from './settings-tabs';

export function SettingsView() {
  return (
    <div className="space-y-6">
      <SettingsHeader />
      <SettingsTabs />
    </div>
  );
}