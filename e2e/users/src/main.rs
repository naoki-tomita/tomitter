#[macro_use]
extern crate serde_derive;
extern crate serde;
extern crate serde_json;

#[derive(Serialize, Deserialize, Debug)]
struct CreateParameter {
    loginName: String,
    password: String
}

#[derive(Serialize, Deserialize, Debug)]
struct LoginParameter {
    loginName: String,
    password: String
}

#[derive(Serialize, Deserialize, Debug)]
struct User {
    id: i32,
    loginName: String
}

impl PartialEq for User {
    fn eq(&self, other: &User) -> bool {
        (self.id == other.id) && (self.loginName == other.loginName)
    }
}

#[derive(Serialize, Deserialize, Debug)]
struct Users {
    users: Vec<User>
}

fn main() {
    create_request();
    list_request();
    login_request();
    identify_request();
}

fn create_request() {
    println!("ユーザーを作成することができる");
    let request = CreateParameter { loginName: "foo".to_owned(), password: "bar".to_owned() };
    let client = reqwest::Client::new();
    let response = client.post("http://localhost:8080/users")
        .json(&request)
        .send();
    let json: User = response.unwrap().json().unwrap();
    println!("{:?}", json);
    assert_eq!(json, User { id: 1, loginName: "foo".to_owned() });
}

fn list_request() {
    println!("ユーザーを取得することができる");
    let json: Users = reqwest::get("http://localhost:8080/users")
        .unwrap()
        .json()
        .unwrap();
    println!("{:?}", json);
    assert_eq!(json.users[0], User { id: 1, loginName: "foo".to_owned() });
}

fn login_request() {
    println!("ログインすることができる");
    let request = LoginParameter { loginName: "foo".to_owned(), password: "bar".to_owned() };
    let client = reqwest::Client::new();
    let response = client.post("http://localhost:8080/users/login")
        .json(&request)
        .send()
        .unwrap();
    let headers = response.headers().get("set-cookie").unwrap();
    println!("{:?}", headers.to_str().unwrap());
    assert!(headers.to_str().unwrap().contains("AUTH-SESSION="));
}

fn identify_request() {
    println!("ログインした上でCookieからユーザーを特定することができる");
    let request = LoginParameter { loginName: "foo".to_owned(), password: "bar".to_owned() };
    let client = reqwest::Client::new();
    let response = client.post("http://localhost:8080/users/login")
        .json(&request)
        .send().unwrap();
    let cookie = response.headers().get("set-cookie").unwrap().to_str().unwrap();
    let user: User = client.get("http://localhost:8080/users/identify")
        .header("cookie", cookie)
        .send()
        .unwrap()
        .json()
        .unwrap();
    println!("{:?}", user);
    assert_eq!(user, User { id: 1, loginName: "foo".to_owned() });
}
