var produtoInput;
var modeloInput;
var diaInput;
//numero da cota
var tCota = '0';
var nCota = 0;
//valor da parcela
var tValor;
var nValor;
//botao de pesquisa de cota
var buttom;
//intervalo de tempo da pesquisa
var intervalo;
var intervaloMin = 400;
var intervaloMax = 900;
//intervalo do numero da cota
var cotaSorteio = 727;
var cotaMax1 = cotaSorteio + 2;
var cotaMin1 = cotaSorteio - 2;
//intervalo do valor da parcela
var parcelaMax1 = 400.00;
var parcelaMin1 = 300.00;
//
var parcela = '0';
var parcelaFaltante = 0;
var parcelaIdeal = 49;//
//
var cpf = 0;
var btCpf;
var buscaParcela = false;
var buscaCota = true;
var buscaGrupo = false;
var count = 0;
var countI = 0;
var maxCount = 30;
//lista de cpf a serem utilizados
var cpfArray = ["998.927.823-72"];

document.addEventListener("DOMContentLoaded", clickar());

function clickar(){
	if(window.location.href == 'https://www3.honda.com.br/vendas/pages/cotaReposicao/consultaReservaCotaReposicao.iface'){
		produtoInput = document.getElementById('formConsultaReservaCotaReposicao:campoProduto');
		modeloInput = document.getElementById('formConsultaReservaCotaReposicao:campoModelo');
		diaInput = document.getElementById('formConsultaReservaCotaReposicao:campoVcto');
		
		//produtoInput.selectedIndex = 5;
		//produtoInput.dispatchEvent(new Event('change'));

		buttom = document.getElementById('formConsultaReservaCotaReposicao:consultaCota');
		btCpf = document.getElementById('formConsultaReservaCotaReposicao:cpf');
		if(buscaCota){
			buscaPorCota();
		}else if(buscaParcela){
			buscaPorParcela();
		}else if(buscaGrupo){
			buscaPorGrupo();
		}
	}
}

function setCpf(){
	cpf = cpfArray[Math.floor(Math.random()*cpfArray.length)];
	btCpf.value = cpf;
}

function setParcela(){
	var btParcela = document.getElementById('formConsultaReservaCotaReposicao:campoParcelasFaltantes');
	var i = 0;
	if(count > maxCount){
		i = parcelaIdeal;
		countI > 2 ? countI = 0 : countI++;
	}else{
		i = parcelaIdeal - countI;
	}
	btParcela.value = '' + i + '';
}

function buscaPorCota(){
	intervalo = setInterval(function(){
		tCota = document.getElementById('formConsultaReservaCotaReposicao:codCota').innerHTML;
		nCota = parseInt(tCota);
		//tValor = document.getElementById('formConsultaReservaCotaReposicao:valorParcela').innerHTML;
		//nValor = parseFloat(tValor);
		if(nCota >= cotaMin1 && nCota <= cotaMax1){// && nValor >= parcelaMin1 && nValor <= parcelaMax1){
			clearInterval(intervalo);
			document.body.style.border = "7px solid red";
			setCpf();
		}else{
			buttom.click();
			document.body.style.border = "7px solid blue";
			//count++;
			//setParcela();
			//if(count > maxCount){
			//	count = 0;
			//}
		}
	},setTempoBusca());
}

function buscaPorParcela(){
	intervalo = setInterval(function(){
		parcela = document.getElementById('formConsultaReservaCotaReposicao:parcelaFaltante').innerHTML;
		parcelaFaltante = parseInt(parcela);
		if(parcelaFaltante == parcelaIdeal){
			clearInterval(intervalo);
			document.body.style.border = "7px solid red";
			setCpf();
		}else{
			buttom.click();
			document.body.style.border = "7px solid blue";
		}
		},setTempoBusca());
}

function buscaPorGrupo(){

}

function setTempoBusca(){
	intervaloMin = Math.ceil(intervaloMin);
	intervaloMax = Math.floor(intervaloMax);
	return Math.floor(Math.random() * (intervaloMax - intervaloMin)) + intervaloMin;
}