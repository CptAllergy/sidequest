// TODO review this code
import { useAuth } from "@zitadel/react-auth";
import { useMutation } from "@tanstack/react-query";
import type { PresignedUploadDto } from "@/lib/types/dto.ts";
import { createPresignedUploadUrl } from "@/services/media-service.ts";

export const useCreatePresignedUpload = () => {
  const auth = useAuth();
  const token = auth.user?.access_token;

  const mutation = useMutation({
    mutationFn: async (presignedUploadDto: PresignedUploadDto) => {
      if (!token) {
        // TODO handle
        throw new Error("Unauthorized without token");
      }
      return await createPresignedUploadUrl(token, presignedUploadDto);
    },
    onSuccess: () => {
      // TODO Anything ??
    },
  });
  return mutation;
};
