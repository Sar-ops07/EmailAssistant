package com.email.EmailAssistant;

import lombok.Data;

@Data
public class EmailRequest {
    private String emailContent;
    private String Tone;


    public CharSequence getTone() {
        return null;
    }

    public char[] getEmailContent() {
        return new char[0];
    }
}
