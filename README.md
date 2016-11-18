# Desafio apresentado
Na matriz da Rivelli, a cada veículo que sai da empresa, é realizado um checklist de verificação dos itens de segurança (farol,seta,luz de freio, pneus, etc), além de algumas informações como hodômetro e qual motorista está conduzindo o veículo.

O Checklist é realizado utilizando um sistema web, que depende de acesso à internet. Entretanto, nas fazendas da empresa, onde há um grande maquinário (caminhões e tratores), não há internet e nem sinal de celular, de modo que o sistema web não possa ser utilizado.

O desafio apresentado consiste em levar o processo de checklist automatizado para as fazendas, empregando conceitos estudados nas disciplinas do curso para o desenvolvimento de uma proposta que solucione o problema de forma criativa e eficiente.

[Video](http://mjunior.com.br/rivelli/video)

[Protótipo em execução](http://mjunior.com.br/rivelli/mvp)

# Proposta de solução com clareza de ideias: 
O   HTML   5   introduziu   um   método   para   permitir   que   um   site   ou   aplicativo   Web  
funcione   sem   conexão   com   a   internet.   Nossa   proposta   usa   desta   nova   tecnologia  
para   disponibilizar   o   checklist   de   forma   offline   com   o   mínimo   de   alteração   e  
investimento para a empresa. 
 
O  cache   do   aplicativo   é   controlado   por   um   arquivo   de   texto   simples   chamado   de  
manifest.appcache.   Neste   arquivo   são   listados   todos   os   recursos   que   devem   ser  
armazenados   no   dispositivo   do   usuário   para   serem   utilizados   quando   não   houver  
conectividade.   Nele   também   são   definidas   as   condições   de   armazenamento   em  
cache,   como   as   páginas   que   não   deverão   ser   armazenadas   e   até   mesmo   o   que  
mostrar ao usuário quando ele acessar uma página que não foi salva. 
 
Se   o   usuário   entrar   em   modo   offline,   mas   visitou   o   site   enquanto   online,   os   recursos  
em   cache   serão   carregados   para   que   o   usuário   ainda   possa   visualizar   e   utilizar   o  
sistema mesmo sem internet. 
 
O   principal   ponto   da   nossa   proposta   é   justamente   não   exigir   muitas   ou   ainda  
nenhuma   alteração   do   backend   utilizado   atualmente,   o   que   facilita   e   muito   a  
implementação   desta   solução.   Além   disso   por   se   utilizar   das   tecnologias   de  
desenvolvimento   web   como   HTML5,   CSS3   e   Javascript,   permite   desenvolvimento  
ágil,   além   de   ser   compativel   com   várias   plataformas   (como   Android,   IOS   e   Windows  
Phone), já que roda pelo próprio navegador do dispositivo. 
 
## A Implementação 
A   implementação   de   nosso   projeto   é   realizada   completamente   no   frontend,  
uma   vez   que   no   login   que   nos   foi   fornecido   podemos   notar   que   todos   os  
envios   são   feitos   por   ajax,   então   conseguimos   manter   desta   forma   sem  
muitas alterações. 
 
Para   obter   sucesso   em   nossa   implementação   utilizamos   basicamente   três  
coisas.   Primeiro   o   arquivo   test.appcache   para   realizar   o   cache   dos   recursos,  
segundo   utilizar   a   função   javascript   ​ navigator.onLine   para   identificarmos   se   o  
usuário   está   ou   não   conectado   a   internet   e   em   terceiro   localStorage   para  
armazenar os dados que são preenchidos das checklist criadas offline. 
 
 
## O navigator.onLine 
Esta   função   tem   um   papel   muito   importante   em   nosso   sistema,   toda   vez   que  
a   aplicação   é   aberta   verificamos   através   dela   se   há   ou   não   conexão   com   a  
internet,   se   o   teste   for   verdadeiro   significa   que   o   usuário   está   conectado,  então   verificamos   se   existe   alguma   informação   no   localStorage   do   aparelho,  
caso   algum   registro   seja   encontrato   pegamos   a   informação   e   enviamos   o  
para o backend da Rivelli. 
 
Linha 230 ­ Scripts.js
https://github.com/mjunior/mvp-rivelli/blob/master/js/scripts.js#L7 
 
Como   nosso   acesso   era   limitado   não   conseguimos   testar   este   envio,   mas   em  
nosso   protótipo   essa   simulação   foi   realizada   informando   uma   mensagem   de  
quantas   checklists   foram   criadas   enquanto   o   usuário   estava   offline,   assim   em  
um   ambiente   real   bastaria   que   percorreremos   esse   array   de   objetos  
(checklist)   e   realizar   a   chamada   de   um   método   POST   nas   urls   certas   que  
foram desenvolvidas no backend em php pela empresa. 
 
Linha 242 ­ Scripts.js
https://github.com/mjunior/mvp-rivelli/blob/master/js/scripts.js#L17
 
 
## localStorage 
Local   Storage   é   um   recurso   do   HTML   5   que   funciona,   assim   podemos   dizer,  
como   um   cookie   que   não   possui   tempo   para   expirar.   Ou   seja,   é   um   local   para  
se   armazenar   dados   que   não   são   perdidos   ao   fim   da   seção,   logo,   podemos  
fechar   e   abrir   o   browser   várias   vezes   e   as   informações   gravadas  
permanecerão lá. 
 
Durante   um   o   preenchimento   da   checklist   um   objeto   será   preenchido,   cada  
checklist   possui   itens   que   devem   ser   verificados,   cada   um   desse   item   possui  
a seguinte estrutura. 
 ```
SETAS_DIANTEIRAS:{ 
  id:4, 
  title:"Setas dianteiras", 
  error:false, 
  correct:false, 
  error_description: "N/A",
}, 
```
 
checklist.json ­ Arquivo completo disponível no github 
https://github.com/mjunior/mvp-rivelli/blob/master/json/checklist.json
 
Quando   o   usuário   selecionar   a   opção   verde,   OK,   o   campo   correct   do   item  
selecionado   é   preenchida   com   TRUE.   Quando   o   usuário   seleciona   a   opção  vermelha,   problema,   o   campo   error   é   marcado   como   FALSE   e   o   campo  
error_description   recebe   a   descrição   do   erro,   essa   descrição   é   uma   checkbox  
criada para cada item. 
 
Scripts.js ­ Linha 327 ­ Selecionada opção OK 
https://github.com/mjunior/mvp-rivelli/blob/master/js/scripts.js#L102
 
Scripts.js ­ Linha 362 ­ Selecionada opção ERRO 
https://github.com/mjunior/mvp-rivelli/blob/master/js/scripts.js#L139
 
Chegando   ao   final   da   checklist   nos   utilizamos   a   função   navigator.onLine   para  
decidir   qual   procedimento   deve   ser   feito.   Se   o   usuário   estiver   conectado   a  
internet   seguimos   o   caminho   padrão,   que   é   o   envio   das   informações   para   o  
backend,   mas   se   o   usuário   estiver   offline,   utilizamos   a   função  
localStorage.setItem para salvar os dados no dispositivo. 
 
Scripts.js ­ Linha 342 
https://github.com/mjunior/mvp-rivelli/blob/master/js/scripts.js#L132
 
 
## Vantagens 
Escolhemos   este   procedimento   para   nossa   solução   pois   vimos   algumas  
vantagens   em   relação   ao   desenvolvimento   de   uma   aplicação   nativa   para  
android. 
 
## Baixo investimento 
Optando   por   desenvolver   uma   aplicação   nativa,   caso   a   empresa   não  
possua   em   seu   time   um   desenvolvedor   android   a   contratação   de   um  
profissional   será   necessária.   Trabalhando   com   nossa   solução   o  
próprio   profissional   de   desenvolvimento   web   com   conhecimentos  
básicos   em   javascript   terá   capacidade   para   desenvolver   a   solução  
com qualidade. 
 
## Prazo 
Como   a   curva   de   aprendizado   necessária   para   implementar   a   solução  
é   baixa   e   as   alterações   são   minimas   o   profissional   responsável   não  
levará muito tempo para deixar tudo funcionando 
 
 
## Multiplataforma 
O   Sistema   continuará   funcionando   em   plataforma   diferentes,   como,  
desktop,   android,   iOs   e   Windows   Phone,   isso   da   a   empresa   liberdade  para   alternar   entre   os   dispositivos   fornecido   aos   motoristas,   e   em   caso  
de manutenção a alteração de um código se aplicará a todos. 
