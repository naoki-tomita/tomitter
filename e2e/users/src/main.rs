extern crate reqwest;

use std::collections::HashMap;

fn createRequest() {
    let client = reqwest::Client::new();
    let response = client.post("http://localhost:8080/users")
        .body(CreateParameter { loginName: "foo".to_owned(), password: "bar".to_owned() });
}

fn main() -> Result<(), Box<std::error::Error>> {
    let resp: HashMap<String, String> = reqwest::get("https://httpbin.org/ip")?
        .json()?;
    println!("{:#?}", resp);
    Ok(())
}

struct CreateParameter {
    loginName: String,
    password: String
}

struct LoginParameter {
    loginName: String,
    password: String
}

struct User {
    id: i32,
    loginName: String
}
