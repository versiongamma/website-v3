import { useQuery } from "@tanstack/react-query";

type ApiResponse = {
  parents: Array<string>;
  lastModifyingUser: {
    displayName: string;
    kind: string;
    me: boolean;
    permissionId: string;
    emailAddress: string;
    photoLink: string;
  };
  owners: Array<{
    displayName: string;
    kind: string;
    me: boolean;
    permissionId: string;
    emailAddress: string;
    photoLink: string;
  }>;
  spaces: Array<string>;
  capabilities: {
    canAcceptOwnership: boolean;
    canAddChildren: boolean;
    canAddMyDriveParent: boolean;
    canChangeCopyRequiresWriterPermission: boolean;
    canChangeItemDownloadRestriction: boolean;
    canChangeSecurityUpdateEnabled: boolean;
    canChangeViewersCanCopyContent: boolean;
    canComment: boolean;
    canCopy: boolean;
    canDelete: boolean;
    canDisableInheritedPermissions: boolean;
    canDownload: boolean;
    canEdit: boolean;
    canEnableInheritedPermissions: boolean;
    canListChildren: boolean;
    canModifyContent: boolean;
    canModifyContentRestriction: boolean;
    canModifyEditorContentRestriction: boolean;
    canModifyOwnerContentRestriction: boolean;
    canModifyLabels: boolean;
    canMoveChildrenWithinDrive: boolean;
    canMoveItemIntoTeamDrive: boolean;
    canMoveItemOutOfDrive: boolean;
    canMoveItemWithinDrive: boolean;
    canReadLabels: boolean;
    canReadRevisions: boolean;
    canRemoveChildren: boolean;
    canRemoveContentRestriction: boolean;
    canRemoveMyDriveParent: boolean;
    canRename: boolean;
    canShare: boolean;
    canTrash: boolean;
    canUntrash: boolean;
  };
  imageMediaMetadata: {
    width: number;
    height: number;
    rotation: number;
  };
  linkShareMetadata: {
    securityUpdateEligible: boolean;
    securityUpdateEnabled: boolean;
  };
  downloadRestrictions: {
    itemDownloadRestriction: {
      restrictedForReaders: boolean;
      restrictedForWriters: boolean;
    };
    effectiveDownloadRestrictionWithContext: {
      restrictedForReaders: boolean;
      restrictedForWriters: boolean;
    };
  };
  kind: string;
  id: string;
  name: string;
  mimeType: string;
  starred: boolean;
  trashed: boolean;
  explicitlyTrashed: boolean;
  version: string;
  webContentLink: string;
  webViewLink: string;
  iconLink: string;
  hasThumbnail: boolean;
  thumbnailLink: string;
  thumbnailVersion: string;
  viewedByMe: boolean;
  createdTime: string;
  modifiedTime: string;
  modifiedByMe: boolean;
  shared: boolean;
  ownedByMe: boolean;
  viewersCanCopyContent: boolean;
  copyRequiresWriterPermission: boolean;
  writersCanShare: boolean;
  originalFilename: string;
  fullFileExtension: string;
  fileExtension: string;
  md5Checksum: string;
  sha1Checksum: string;
  sha256Checksum: string;
  size: string;
  quotaBytesUsed: string;
  headRevisionId: string;
  inheritedPermissionsDisabled: boolean;
}[];

const KEY = "photos";
const { VITE_GOOGLE_DRIVE_API_KEY, VITE_PHOTO_DRIVE_FOLDER_ID } = import.meta
  .env;

export const usePhotosQuery = () => {
  const { data, ...query } = useQuery({
    queryKey: [KEY],
    queryFn: async () => {
      const params = new URLSearchParams({
        q: `'${VITE_PHOTO_DRIVE_FOLDER_ID}' in parents`,
        key: VITE_GOOGLE_DRIVE_API_KEY,
        fields: "*",
      });
      const result = await fetch(
        `https://www.googleapis.com/drive/v3/files?${params.toString()}`
      );

      if (result.status !== 200) {
        return [];
      }

      const files = (await result.json()).files as ApiResponse;
      console.log(files);

      const r = files.map((file) => ({
        url: `https://lh3.googleusercontent.com/d/${file.id}`,
        thumbnailUrl: file.thumbnailLink,
        aspectRatio:
          file.imageMediaMetadata.width / file.imageMediaMetadata.height,
      }));

      console.log(r);
      return r;
    },
  });

  return {
    photos: data,
    ...query,
  };
};
