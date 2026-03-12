import { Platform } from 'react-native';

const BASE_URL = 'https://broskiiii-test.hf.space';

export interface AnalysisResponse {
  // Define expected response structure here if known, otherwise generic object
  [key: string]: any;
}

export const apiService = {
  /**
   * Check the health of the API
   */
  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${BASE_URL}/health`);
      return response.ok;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  },

  /**
   * Analyze text content
   * @param text The string to analyze (email body, URL, headline, etc.)
   */
  async analyzeText(text: string): Promise<AnalysisResponse> {
    try {
      const response = await fetch(`${BASE_URL}/analyze/text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Text analysis failed:', error);
      throw error;
    }
  },

  /**
   * Analyze an image file
   * @param imageUri Local URI of the image to analyze
   * @param fileName Optional filename
   * @param mimeType Optional mime type
   */
  async analyzeImage(imageUri: string, fileName = 'image.jpg', MimeType = 'image/jpeg'): Promise<AnalysisResponse> {
    return this._uploadFile(`${BASE_URL}/analyze/image`, imageUri, fileName, MimeType);
  },

  /**
   * Analyze a video file
   * @param videoUri Local URI of the video to analyze
   * @param fileName Optional filename
   * @param mimeType Optional mime type
   */
  async analyzeVideo(videoUri: string, fileName = 'video.mp4', MimeType = 'video/mp4'): Promise<AnalysisResponse> {
    return this._uploadFile(`${BASE_URL}/analyze/video`, videoUri, fileName, MimeType);
  },

  /**
   * Analyze an audio file
   * @param audioUri Local URI of the audio to analyze
   * @param fileName Optional filename
   * @param MimeType Optional mime type
   */
  async analyzeAudio(audioUri: string, fileName = 'audio.m4a', MimeType = 'audio/m4a'): Promise<AnalysisResponse> {
    return this._uploadFile(`${BASE_URL}/analyze/audio`, audioUri, fileName, MimeType);
  },

  /**
   * Analyze a generic file
   * @param fileUri Local URI of the file to analyze
   * @param fileName Optional filename
   * @param MimeType Optional mime type
   */
  async analyzeFile(fileUri: string, fileName = 'document.pdf', MimeType = 'application/pdf'): Promise<AnalysisResponse> {
    return this._uploadFile(`${BASE_URL}/analyze/file`, fileUri, fileName, MimeType);
  },

  /**
   * Generic helper for multipart/form-data file uploads
   */
  async _uploadFile(url: string, fileUri: string, fileName: string, type: string): Promise<AnalysisResponse> {
    try {
      const formData = new FormData();
      
      // React Native FormData requires exactly these fields for a file
      formData.append('file', {
        uri: Platform.OS === 'ios' ? fileUri.replace('file://', '') : fileUri,
        name: fileName,
        type,
      } as any);

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`File upload failed for ${url}:`, error);
      throw error;
    }
  }
};
