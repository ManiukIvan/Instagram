package backend.entity;

import javax.persistence.*;

@Entity
@Table(name="subscription_status")
public class SubscriptionStatus {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private short id;
	private String name;
	
	public SubscriptionStatus() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public SubscriptionStatus(short id, String name) {
		super();
		this.id = id;
		this.name = name;
	}

	public int getId() {
		return id;
	}
	
	public void setId(short id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return String.format(
                "SubscriptionStatus[id=%d, name='%s']",
                id, name);
	}
	
	

}
