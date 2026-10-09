import type {
  PresignedUploadDto,
  PresignedUploadResponseDto,
} from "@/lib/types/dto.ts";

export const createPresignedUploadUrl = async (
  accessToken: string,
  presignedUploadDto: PresignedUploadDto,
): Promise<PresignedUploadResponseDto> => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/uploads/presign`,
    {
      method: "POST",
      body: JSON.stringify(presignedUploadDto),
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to create upload url: ${res.status}`);
  }

  return (await res.json()) as PresignedUploadResponseDto;
};

export const uploadImage = async (url: string, file: File) => {
  const res = await fetch(url, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to upload image: ${res.status}`);
  }
};
