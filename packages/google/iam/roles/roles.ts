export enum CloudKMSRoles {
  ADMIN = "roles/cloudkms.admin",
  ENCRYPTER = "roles/cloudkms.cryptoKeyEncrypter",
  ENCRYPTER_DECRYPTER = "roles/cloudkms.cryptoKeyEncrypterDecrypter",
  VIEWER = "roles/cloudkms.viewer",
}

export enum PubSubRoles {
  PUBLISHER = "roles/pubsub.publisher",
}

export enum StorageRoles {
  OBJECT_ADMIN = "roles/storage.objectAdmin",
  OBJECT_CREATOR = "roles/storage.objectCreator",
  OBJECT_VIEWER = "roles/storage.objectViewer",
}
