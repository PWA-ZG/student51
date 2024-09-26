export default function Offline() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<h1 className="text-4xl font-bold mb-4">Web2 PWA Application</h1>
			<h3 className="text-2xl mb-4">Clicker game</h3>
			<button className="btn btn-outline-primary btn-rounded px-4 py-2">
				Click To Play
			</button>
			<div className="text-center text-gray-500 mt-4">
				You are offline
			</div>
		</div>
	)
}
