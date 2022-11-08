export default function calcDiffInDays(now, messageSentDate) {
  const diffInDays = (
					   now - messageSentDate
					 ) / (
					   (
						 1000 * 60 * 60 * 24
					   )
					 );
  if (diffInDays < 0.1)
	return (
	  "Short time ago"
	)
  else if (diffInDays < 0.25)
	return (
	  "Some time ago"
	)
  else if (diffInDays < 0.5)
	return (
	  "12 hours ago"
	)
  else if (diffInDays < 1)
	return (
	  "More than 12 hours ago"
	)
  else if (diffInDays < 2)
	return (
	  "More than a day ago"
	)
  else
	return (
	  "Long time ago"
	)
}
