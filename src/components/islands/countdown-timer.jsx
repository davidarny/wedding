import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2026-06-06T15:00:00+03:00");

function calculateTimeLeft() {
	const now = new Date();
	const diff = TARGET_DATE - now;

	if (diff <= 0) {
		return false; // Wedding has passed
	}

	const seconds = Math.floor(diff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const weeks = Math.floor(days / 7);

	return {
		weeks,
		days: days % 7,
		hours: hours % 24,
		minutes: minutes % 60,
		seconds: seconds % 60,
	};
}

const UNIT_LABELS = [
	{ key: "weeks", label: "недель" },
	{ key: "days", label: "дней" },
	{ key: "hours", label: "часов" },
	{ key: "minutes", label: "минут" },
	{ key: "seconds", label: "секунд" },
];

export default function CountdownTimer() {
	const [timeLeft, setTimeLeft] = useState(null);

	useEffect(() => {
		setTimeLeft(calculateTimeLeft());
		const timer = setInterval(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	if (timeLeft === null) {
		return (
			<div className="flex justify-center items-start gap-4 md:gap-8 py-4">
				{UNIT_LABELS.map((unit) => (
					<div key={unit.label} className="text-center">
						<div className="text-3xl md:text-5xl font-bold leading-none text-text">
							--
						</div>
						<div className="text-xs md:text-sm mt-2 uppercase tracking-wider text-text-muted">
							{unit.label}
						</div>
					</div>
				))}
			</div>
		);
	}

	if (timeLeft === false) {
		return (
			<div className="text-center py-8">
				<p className="text-2xl md:text-3xl font-bold text-primary-dark">
					Свадьба состоялась!
				</p>
			</div>
		);
	}

	return (
		<div className="flex justify-center items-start gap-4 md:gap-8 py-4">
			{UNIT_LABELS.map((unit) => (
				<div key={unit.label} className="text-center">
					<div className="text-3xl md:text-5xl font-bold leading-none text-text">
						{String(timeLeft[unit.key]).padStart(2, "0")}
					</div>
					<div className="text-xs md:text-sm mt-2 uppercase tracking-wider text-text-muted">
						{unit.label}
					</div>
				</div>
			))}
		</div>
	);
}
