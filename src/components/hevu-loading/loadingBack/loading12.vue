<template>
	<div style="display: flex;justify-content: center;">
		<div class="ml-loader" :style="bodyStyle">
			<div class="back" :style="backStyle"></div>
			<div class="back" :style="backStyle"></div>
			<div class="back" :style="backStyle"></div>
			<div class="back" :style="backStyle"></div>
			<div class="back" :style="backStyle"></div>
			<div class="back" :style="backStyle"></div>
			<div class="back" :style="backStyle"></div>
			<div class="back" :style="backStyle"></div>
			<div class="back" :style="backStyle"></div>
			<div class="back" :style="backStyle"></div>
			<div class="back" :style="backStyle"></div>
			<div class="back" :style="backStyle"></div>
		</div>
		
	</div>
	
</template>

<script>
	export default {
		name: "LoadingBack12",
		props: {
			bacgColor: {
				type: String,
				default: '#3375f6'
			},
			size: {
				type: Number,
				default: 200,
			}

		},
		computed: {
			backStyle: function() {
				return {
					// '-webkit-transform-origin': (this.size * .5 ) + 'rpx' + ' ' + (this.size * .5 ) + 'rpx',
					// '-ms-transform-origin': (this.size * .5 ) + 'rpx'+ ' ' + (this.size * .5 ) + 'rpx',
					// transformOrigin: (this.size * .6 ) + 'rpx'+ ' ' + (this.size * .6 ) + 'rpx',
				}
			},
			bodyStyle: function() {
				return {
					transform: `scale(${this.size / 200})`,
					'--backgroundColor': this.bacgColor,
				}
			},
		},
		data() {
			return {

			}
		}
	}
</script>

<style scoped lang="scss">
	.ml-loader {
		position: relative;
		width: 70px;
		height: 70px;
		
		.back {
			-webkit-transform-origin: 32px 32px;
			-ms-transform-origin: 32px 32px;
			transform-origin: 32px 32px;
			
			-webkit-animation: 1.2s opaque ease-in-out infinite both;
			animation: 1.2s opaque ease-in-out infinite both;

			&::after {
				content: "";
				display: block;
				position: absolute;
				top: 0;
				left: 30px;
				width: 5px;
				height: 18px;
				border-radius: 10px;
				background-color: var(--backgroundColor);
			}

			&:nth-child(1) {
				-webkit-transform: rotate(0);
				-ms-transform: rotate(0);
				transform: rotate(0);
			}

			&:nth-child(2) {
				-webkit-transform: rotate(30deg);
				-ms-transform: rotate(30deg);
				transform: rotate(30deg);
				-webkit-animation-delay: 0.1s;
				animation-delay: 0.1s;
			}

			&:nth-child(3) {
				-webkit-transform: rotate(60deg);
				-ms-transform: rotate(60deg);
				transform: rotate(60deg);
				-webkit-animation-delay: 0.2s;
				animation-delay: 0.2s;
			}

			&:nth-child(4) {
				-webkit-transform: rotate(90deg);
				-ms-transform: rotate(90deg);
				transform: rotate(90deg);
				-webkit-animation-delay: 0.3s;
				animation-delay: 0.3s;
			}

			&:nth-child(5) {
				-webkit-transform: rotate(120deg);
				-ms-transform: rotate(120deg);
				transform: rotate(120deg);
				-webkit-animation-delay: 0.4s;
				animation-delay: 0.4s;
			}

			&:nth-child(6) {
				-webkit-transform: rotate(150deg);
				-ms-transform: rotate(150deg);
				transform: rotate(150deg);
				-webkit-animation-delay: 0.5s;
				animation-delay: 0.5s;
			}

			&:nth-child(7) {
				-webkit-transform: rotate(180deg);
				-ms-transform: rotate(180deg);
				transform: rotate(180deg);
				-webkit-animation-delay: 0.6s;
				animation-delay: 0.6s;
			}

			&:nth-child(8) {
				-webkit-transform: rotate(210deg);
				-ms-transform: rotate(210deg);
				transform: rotate(210deg);
				-webkit-animation-delay: 0.7s;
				animation-delay: 0.7s;
			}

			&:nth-child(9) {
				-webkit-transform: rotate(240deg);
				-ms-transform: rotate(240deg);
				transform: rotate(240deg);
				-webkit-animation-delay: 0.8s;
				animation-delay: 0.8s;
			}

			&:nth-child(10) {
				-webkit-transform: rotate(270deg);
				-ms-transform: rotate(270deg);
				transform: rotate(270deg);
				-webkit-animation-delay: 0.9s;
				animation-delay: 0.9s;
			}

			&:nth-child(11) {
				-webkit-transform: rotate(300deg);
				-ms-transform: rotate(300deg);
				transform: rotate(300deg);
				-webkit-animation-delay: 1s;
				animation-delay: 1s;
			}

			&:nth-child(12) {
				-webkit-transform: rotate(330deg);
				-ms-transform: rotate(330deg);
				transform: rotate(330deg);
				-webkit-animation-delay: 1.1s;
				animation-delay: 1.1s;
			}

			&:nth-child(13) {
				-webkit-transform: rotate(360deg);
				-ms-transform: rotate(360deg);
				transform: rotate(360deg);
				-webkit-animation-delay: 1.2s;
				animation-delay: 1.2s;
			}

		}
	}


	@-webkit-keyframes opaque {
		0% {
			opacity: 0.1;
		}

		40% {
			opacity: 1;
		}

		80% {
			opacity: 0.1;
		}

		100% {
			opacity: 0.1;
		}
	}

	@keyframes opaque {
		0% {
			opacity: 0.1;
		}

		40% {
			opacity: 1;
		}

		80% {
			opacity: 0.1;
		}

		100% {
			opacity: 0.1;
		}
	}
</style>
