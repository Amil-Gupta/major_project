package com.externalpackage.test;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@ResponseBody
public class TestController {
	@GetMapping("/external_test")
	public String firstHandler() {
		return "External Package Scan Test";
	}
}