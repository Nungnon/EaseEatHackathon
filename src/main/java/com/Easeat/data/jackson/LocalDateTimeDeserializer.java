package com.Easeat.data.jackson;

import java.io.IOException;
import java.time.LocalDateTime;

import java.time.format.DateTimeParseException;

import com.fasterxml.jackson.core.JsonParser;

import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonMappingException;


public class LocalDateTimeDeserializer extends JsonDeserializer<LocalDateTime> {
    @Override
    public LocalDateTime deserialize(JsonParser parser, DeserializationContext context) throws IOException {
        String dateTimeString = parser.getText();
        try {
            if (dateTimeString.endsWith("Z")) {
                return LocalDateTime.parse(dateTimeString.substring(0, dateTimeString.length() - 1));
            }
            return LocalDateTime.parse(dateTimeString);
        } catch (DateTimeParseException e) {
            throw new JsonMappingException(parser, "Invalid date format: " + dateTimeString, e);
        }
    }
}
