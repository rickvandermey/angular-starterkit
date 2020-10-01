import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

/**
 * Extendable base class, all pages should use.
 */
@Component({
	selector: 'app-base-component',
	template: 'no-ui',
})
export abstract class BaseComponent implements OnDestroy {
	/**
	 * Array of subscriptions handled by this component.
	 */
	protected mutableSubscriptions: Array<Subscription> = [];

	/**
	 * Add a subscription.
	 * @access Protected
	 * @param { Subscription } subscription
	 * @return { Subscription }
	 */
	protected addSubscription(subscription: Subscription): Subscription {
		this.mutableSubscriptions.push(subscription);
		return subscription;
	}

	/**
	 * Unsubscribe from all subscriptions.
	 * @access Protected
	 */
	protected unsubscribeAll(): void {
		this.mutableSubscriptions.forEach(
			(subscription: Subscription) =>
				!subscription['isUnsubscribed'] && subscription.unsubscribe(),
		);
	}

	/**
	 * Should be used by all pages when ngOnDestroy wants to be triggered.
	 */
	protected extendedNgOnDestroy(): void {}

	/**
	 * Destructor which unsubscribe the dangling subscriptions.
	 */
	ngOnDestroy(): void {
		this.unsubscribeAll();
		this.extendedNgOnDestroy();
	}
}
