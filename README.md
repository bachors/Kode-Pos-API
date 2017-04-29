# Kode-Pos-API
Firebase.

# URI
<a href="https://kodepos-2d475.firebaseio.com/">https://kodepos-2d475.firebaseio.com/</a>

# List Propinsi
<a href="https://kodepos-2d475.firebaseio.com/list_propinsi.json?print=pretty">https://kodepos-2d475.firebaseio.com/list_propinsi.json?print=pretty</a>
<pre>{
	"p1" : "Bali",
	"p10" : "Jawa Tengah",
	"p11" : "Jawa Timur",
	"p12" : "Kalimantan Barat",
	"p13" : "Kalimantan Selatan",
	"p14" : "Kalimantan Tengah",
	"p15" : "Kalimantan Timur",
	"p16" : "Kalimantan Utara",
	...
}</pre>

# List Kota/Kabupaten
<a href="https://kodepos-2d475.firebaseio.com/list_kotakab/p9.json?print=pretty">https://kodepos-2d475.firebaseio.com/list_kotakab/{KEY_PROPINSI}.json?print=pretty</a>
<pre>{
	"k60" : "Tasikmalaya",
	"k61" : "Pangandaran",
	"k62" : "Ciamis",
	"k63" : "Banjar",
	"k64" : "Cirebon",
	"k65" : "Kuningan",
	...
}</pre>

<h1>List Kecamatan, Kelurahan & Kodepos</h1>
<a href="https://kodepos-2d475.firebaseio.com/kota_kab/k1.json?print=pretty">https://kodepos-2d475.firebaseio.com/kota_kab/{KEY_KOTA}.json?print=pretty</a>
<pre>[
	{
		"kecamatan" : "Pekutatan",
		"kelurahan" : "Pulukan",
		"kodepos" : "82262"
	},
	{
		"kecamatan" : "Pekutatan",
		"kelurahan" : "Pekutatan",
		"kodepos" : "82262"
	},
	{
		"kecamatan" : "Pekutatan",
		"kelurahan" : "Pengeragoan (Pengragoan)",
		"kodepos" : "82262"
	},
	...
]</pre>
