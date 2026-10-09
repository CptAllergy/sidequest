// TODO review this code
import { useAuth } from "@zitadel/react-auth";
import { useMutation } from "@tanstack/react-query";
import {
  createPresignedUploadUrl,
  uploadImage,
} from "@/services/media-service.ts";

export const useImageUpload = () => {
  const auth = useAuth();
  const token = auth.user?.access_token;

  return useMutation({
    mutationFn: async (file: File) => {
      if (!token) {
        // TODO handle
        throw new Error("Unauthorized without token");
      }

      const presignedUploadDto = { contentType: file.type };
      const { url, imageKey } = await createPresignedUploadUrl(
        token,
        presignedUploadDto,
      );

      await uploadImage(url, file);
      return imageKey;
    },
    onSuccess: () => {
      // TODO Anything ??
    },
  });
};
