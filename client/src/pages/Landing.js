import React from 'react';
import '../styles/Landing.css';
import { Link } from 'react-router-dom';

const Landing = () => {
	return (
		<div className="landing-container">
			<div class="header">
				<div class="inner-header flex">
					<h1 className="heading">reZonance</h1>
					<h5>
						Tell us your favourite song from your playlist <br />{' '}
						and we’ll serve up with 10 similar tracks that you’ll
						love!
					</h5>
					<button class="pulse">
						<Link to="/search">Get Started</Link>
					</button>
				</div>

				<div>
					<svg
						class="waves"
						xmlns="http://www.w3.org/2000/svg"
						xmlnsXlink="http://www.w3.org/1999/xlink"
						viewBox="10 24 150 28"
						preserveAspectRatio="none"
						shape-rendering="auto"
					>
						<defs>
							<path
								id="gentle-wave"
								d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
							/>
						</defs>
						<g class="parallax">
							<use
								xlinkHref="#gentle-wave"
								x="48"
								y="0"
								fill="rgba(255,255,255,0.6"
							/>
							<use
								xlinkHref="#gentle-wave"
								x="48"
								y="3"
								fill="rgba(255,255,255,0.4)"
							/>
							<use
								xlinkHref="#gentle-wave"
								x="48"
								y="5"
								fill="rgba(255,255,255,0.2)"
							/>
							<use
								xlinkHref="#gentle-wave"
								x="48"
								y="7"
								fill="#fff"
							/>
						</g>
					</svg>
				</div>
			</div>

			<div class="content flex"></div>
		</div>
	);
};

export default Landing;
