package backend.entity;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Account {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String login;
	private String password;
	@Column(name="first_name")
	private String firstName;
	@Column(name="last_name")
	private String lastName;
	private byte age;
	private String email;
	@ManyToMany
	@JoinTable(
			name="account_subscription",
			joinColumns= {@JoinColumn(name = "account_id")},
			inverseJoinColumns= {@JoinColumn(name = "subscription_id")})
	Set<Subscription> subscriptions = new HashSet<>();

	public Account() {
	}

	public Account(String login, String password, String firstName, String lastName, byte age, String email) {
		super();
		this.login = login;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.age = age;
		this.email = email;
	}

	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getLogin() {
		return login;
	}


	public void setLogin(String login) {
		this.login = login;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public String getFirstName() {
		return firstName;
	}


	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}


	public String getLastName() {
		return lastName;
	}


	public void setLastName(String lastName) {
		this.lastName = lastName;
	}


	public byte getAge() {
		return age;
	}


	public void setAge(byte age) {
		this.age = age;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}

    // Account пользователя владеет этой связью, можно предложить такие методы для добавления и удаления подписок
	public void addSubscription(Subscription subscription) {
		subscriptions.add(subscription);
		subscription.getAccounts().add(this);
	}
	
	public void removeSubscription(Subscription subscription) {
		subscriptions.remove(subscription);
		subscription.getAccounts().remove(this);
	}

	@Override
	public String toString() {
		return "Account [id=" + id + ", login=" + login + ", password=" + password + ", firstName=" + firstName
				+ ", lastName=" + lastName + ", age=" + age + ", email=" + email + ", subscriptions=" + subscriptions
				+ "]";
	}

}
