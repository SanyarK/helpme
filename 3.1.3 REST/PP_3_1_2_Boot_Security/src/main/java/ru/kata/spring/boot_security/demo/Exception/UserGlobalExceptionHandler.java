package ru.kata.spring.boot_security.demo.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
public class UserGlobalExceptionHandler {

    @ExceptionHandler
    public ResponseEntity<UserException> handlerException(
            NoSuchUserException noSuchUserException) {
        UserException userException = new UserException();
        userException.setInfo(noSuchUserException.getMessage());

        return new ResponseEntity<>(userException, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<UserException> handlerException(
            Exception exception) {
        UserException userException = new UserException();
        userException.setInfo(exception.getMessage());

        return new ResponseEntity<>(userException, HttpStatus.BAD_REQUEST);
    }
}
