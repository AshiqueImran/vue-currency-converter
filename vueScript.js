new Vue({

	el: '#app',

	data:{
		currencies:0,
		amount:0,
		from:'USD',
		to:'BDT',
		convertRate:0,
		loading: false
	},

	mounted()
	{
		this.getCurrencies();
	},

	methods:{

		getCurrencies()
		{
			const currencies = localStorage.getItem('currenciesInLocalStorage');

			if (currencies) {
				this.currencies=JSON.parse(currencies);
				return 0; // if currencies is not empty it saves data and api req is not called
			}

			// if no local-Storage api will be called

			axios.get("https://free.currencyconverterapi.com/api/v6/currencies")
			.then(response=>{

				this.currencies=response.data.results; // replacing currencies:0 in data
				localStorage.setItem('currenciesInLocalStorage',JSON.stringify(response.data.results));
			
			});
		},
		convertCurrency()
		{
			var key=this.from+'_'+this.to;

			this.loading= true;

			axios.get('https://free.currencyconverterapi.com/api/v6/convert?q='+key)
			.then(response=>{
				// console.log(response);
				this.convertRate=response.data.results[key].val;
				this.loading=false;
			});
		}
	},

	computed:{

		formattedCurrencies()
		{
			return Object.values(this.currencies);
		},
		calculateResult()
		{
			return (this.amount * Number(this.convertRate)).toFixed(3);
		},
		disabaledButton()
		{
			return this.amount == 0 || !this.amount || this.loading;
		}
	},

	watch:{
		from()
		{
			this.convertRate=0;
		},
		to()
		{
			this.convertRate=0;
		}
	}

});