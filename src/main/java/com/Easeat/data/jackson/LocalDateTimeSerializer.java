package com.Easeat.data.jackson;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

public class LocalDateTimeSerializer extends StdSerializer<LocalDateTime>{
private static DateTimeFormatter FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

    public LocalDateTimeSerializer() {
        this(null);
    }

    public LocalDateTimeSerializer(Class<LocalDateTime> clazz) {
        super(clazz);
    }

    @Override
    public void serialize(LocalDateTime localDate, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeString(localDate.format(FORMATTER));
    }
}
