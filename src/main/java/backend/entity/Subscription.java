package backend.entity;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

//import java.util.Optional;
//import javax.persistence.Column;

@Entity
@Table(name="subscription")
public class Subscription {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private int price;
	private String dim;
	@Enumerated
	//@Column(columnDefinition = "smallint")
	//private SubscriptionStatus status;
	private SubscriptionStatusEnum status;
	@ManyToMany(mappedBy="subscriptions")
	private Set<Account> accounts = new HashSet<>();

	public Subscription() {
		// TODO Auto-generated constructor stub
	}

/*	public Subscription(Long id, String name, int price, String dim, Optional<SubscriptionStatus> status) {
		super();
		this.id = id;
		this.name = name;
		this.price = price;
		this.dim = dim;
		this.status = status.get();
	}*/

	public Subscription(String name, int price, String dim, SubscriptionStatusEnum status) {
		super();
		//this.id = id;
		this.name = name;
		this.price = price;
		this.dim = dim;
		this.status = status;
	}	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public String getDim() {
		return dim;
	}

	public void setDim(String dim) {
		this.dim = dim;
	}

	public SubscriptionStatusEnum getStatus() {
		return status;
	}

	public void setStatus(SubscriptionStatusEnum status) {
		this.status = status;
	}
	
	public Set<Account> getAccounts() {
		return accounts;
	}

	public void setAccounts(Set<Account> accounts) {
		this.accounts = accounts;
	}

	@Override
	public String toString() {
		return String.format("Subscription [id=%d, name='%s', price=%d, dim='%s', status='%s', accounts.size=%d]", 
				id, name, price, dim, status, accounts.size());
	}
	
	

}
