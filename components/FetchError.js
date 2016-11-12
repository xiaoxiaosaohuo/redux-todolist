import React from 'react';

const FetchError = ({message,onRetry}) =>(
	<div>
		<p> 无法请求数据.{message}</p>
		<button onClick={onRetry}> 重试</button>
	</div>
)

export FetchError;
