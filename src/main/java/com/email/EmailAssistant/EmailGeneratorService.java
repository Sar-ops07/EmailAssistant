package com.email.EmailAssistant;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

@Service
public class EmailGeneratorService {

    private final WebClient webClient;
    private final String apiKey;

    public EmailGeneratorService(WebClient.Builder webClientBuilder,
                                 @Value("${gemini.api.url}") String baseUrl,
                                 @Value("${gemini.api.key}") String geminiApiKey) {
        this.webClient = webClientBuilder.baseUrl(baseUrl).build();
        this.apiKey = geminiApiKey;
    }

    public String generateEmailReply(EmailRequest emailRequest) {
        String prompt = buildPrompt(emailRequest);

        // escape quotes in prompt to avoid broken JSON
        String safePrompt = prompt.replace("\"", "\\\"");

        String requestBody = String.format("""
                {
                  "contents": [
                    {
                      "parts": [
                        { "text": "%s" }
                      ]
                    }
                  ]
                }
                """, safePrompt);

        try {
            String response = webClient.post()
                    .uri("v1beta/models/gemini-2.5-flash:generateContent")
                    .header("x-goog-api-key", apiKey)
                    .header("Content-Type", "application/json")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            return extractResponseContent(response);

        } catch (WebClientResponseException e) {
            return "Gemini API Error: " + e.getResponseBodyAsString();
        } catch (Exception e) {
            return "Unexpected Error: " + e.getMessage();
        }
    }

    private String extractResponseContent(String response) {
        if (response == null || response.isBlank()) {
            return "No response from model";
        }

        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);
            JsonNode textNode = root.path("candidates")
                    .path(0)
                    .path("content")
                    .path("parts")
                    .path(0)
                    .path("text");

            if (textNode.isMissingNode() || textNode.isNull()) {
                return "No content returned from Gemini API";
            }
            return textNode.asText();
        } catch (Exception e) {
            return "Failed to parse Gemini API response: " + e.getMessage();
        }
    }

    private String buildPrompt(EmailRequest emailRequest) {
        StringBuilder sb = new StringBuilder();
        sb.append("Generate a professional email reply. ");

        if (emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()) {
            sb.append("Use a ").append(emailRequest.getTone()).append(" tone. ");
        }

        sb.append("Original Email:\n")
                .append(emailRequest.getEmailContent() == null ? "" : emailRequest.getEmailContent());

        return sb.toString();
    }
}
