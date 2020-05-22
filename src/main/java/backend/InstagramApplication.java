package backend;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
//import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import backend.entity.Account;
import backend.entity.Subscription;
import backend.entity.SubscriptionStatus;
import backend.entity.SubscriptionStatusEnum;
import backend.repository.AccountRepository;
import backend.repository.SubscriptionRepository;
import backend.repository.SubscriptionStatusRepository;

@SpringBootApplication
public class InstagramApplication {
    private static final Logger LOG = LoggerFactory.getLogger(InstagramApplication.class);

    @Autowired
    private SubscriptionStatusRepository subscriptionStatusRepository;
    @Autowired
    private SubscriptionRepository subscriptionRepository;
    @Autowired
    private AccountRepository accountRepository;

    public static void main(String[] args) {
        SpringApplication.run(InstagramApplication.class, args);
    }

    @Bean
    public CommandLineRunner springdata() {
        return(args) -> {
            for(SubscriptionStatus status:subscriptionStatusRepository.findAll()) {
                LOG.debug("Subscription status: {}", status);
            };
            // удаляем все subscriptions от предыдущего запуска
            //TODO demo the constrain violation
            //subscriptionRepository.deleteAll();
            // делаем подписки
            Subscription subscriptionWin10 = new Subscription(
                    "Microsoft Windows 10",
                    10,
                    "$",
                    //subscriptionStatusRepository.findById((short) 0));
                    SubscriptionStatusEnum.INITIAL);
            subscriptionRepository.save(subscriptionWin10);
            Subscription subscriptionOffice2010 = new Subscription(
                    "Microsoft Office 2010",
                    50,
                    "$",
                    //subscriptionStatusRepository.findById((short) 0));
                    SubscriptionStatusEnum.INITIAL);
            subscriptionRepository.save(subscriptionOffice2010);
            // делаем выборку по только что созданным подпискам и выводим в лог
            for(Subscription subscription:subscriptionRepository.findAll()) {
                LOG.debug("Subscription: {}", subscription);
            };
            //удаляем все account'ы пользователей
            //TODO demo the constrain violation
            accountRepository.deleteAll();
            // заводим пользователей системы и добавляем им подписки на продукты
            Account userAccount1 = new Account(
                    "user1",
                    "password1",
                    "user1",
                    "user1",
                    (byte) 23,
                    "user1@test.com"
            );
            userAccount1.addSubscription(subscriptionWin10);
            accountRepository.save(userAccount1);

            Account userAccount2 = new Account(
                    "user2",
                    "password2",
                    "user2",
                    "user2",
                    (byte) 24,
                    "user2@test.com"
            );
            userAccount2.addSubscription(subscriptionWin10);
            accountRepository.save(userAccount2);

            // делаем выборку по только что созданным account'ам и выводим в лог
            for(Account account:accountRepository.findAll()) {
                LOG.debug("Account: {}", account);
            };

        };
    }
}
