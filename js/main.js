// 共通で使うGASのURL（ここを新しいURLにするだけ！）
const GAS_URL = "https://script.google.com/macros/s/AKfycbxY7HezJ_p6j_dhFTXSow4NLhOCQx1Yzj_V9euiSTErIZ8I_SUsYW_OK8G6piQtmQ27jA/exec";

// 1. いいね！を送る共通関数
function sendLike(charaName) {
	// 画面上の数字をカウントアップ
	const countSpan = document.getElementById('like-count');
	if (countSpan) {
		let currentCount = parseInt(countSpan.textContent) || 0;
		countSpan.textContent = currentCount + 1;
	}

	const params = new URLSearchParams();
	params.append('type', 'like');
	params.append('charaName', charaName);
	params.append('content', charaName + 'に「いいね！」が押されました');

	// GET通信で確実にスプレッドシートへ飛ばす
	fetch(GAS_URL + "?" + params.toString())
		.catch(error => console.error('Error:', error));
}

// 2. 名前募集フォームが送信されたときの処理
document.querySelectorAll('.naming-form').forEach(form => {
	form.addEventListener('submit', function (e) {
		e.preventDefault();

		const currentForm = e.target;
		const formData = new FormData(currentForm);
		const charaName = currentForm.getAttribute('data-chara');

		const params = new URLSearchParams();
		params.append('type', 'naming');
		params.append('charaName', charaName);
		params.append('character_name', formData.get('character_name'));

		// GET通信で確実にスプレッドシートへ飛ばす
		fetch(GAS_URL + "?" + params.toString())
			.then(() => {
				alert("素敵な名前をありがとうございます！応募を受け付けました。");
				currentForm.reset();
			})
			.catch(error => {
				alert("送信エラーが発生しました。");
				console.error('Error:', error);
			});
	});
});

// 3. 「上へ戻る」ボタンのスクロール表示制御
const toTopWrap = document.getElementById('js-totop');

if (toTopWrap) {
	// 200px以上スクロールしたら .is-show クラスを付け外しする
	window.addEventListener('scroll', () => {
		if (window.scrollY > 200) {
			toTopWrap.classList.add('is-show');
		} else {
			toTopWrap.classList.remove('is-show');
		}
	});

	// ボタンをクリックしたら上までスルスル戻る
	const toTopBtn = toTopWrap.querySelector('.to-top-btn');
	if (toTopBtn) {
		toTopBtn.addEventListener('click', () => {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		});
	}
}