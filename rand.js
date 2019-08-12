/* Implementation of the Box-Muller transform to produce a sample from a random normal*/
 
function box_muller(mu, sigma) {
  
  var x, y, r, v = 0;
    
  do {
    x = 2*Math.random() - 1;
    y = 2*Math.random() - 1;
    r = x*x + y*y;
  }
  while (r >= 1);
    
  co = Math.sqrt( -2 * Math.log(r) / r);
  v = x*co;
 
  return v*sigma + mu;
}
 
/* Generate an exponential distribution using inverse CDF */
 
function generate_exp( lambda ){
  
  var ex, u = 0;
  
  u = Math.random();
 
  ex = -( 1 / lambda ) * Math.log(1 - u);
  
  return ex;
}
 
/* Generate a logistic distribution using inverse CDF */
 
function generate_logistic( mu, sigma ){
  
  var lgstc, u = 0;
  
  u = Math.random();
 
  lgstc = mu + sigma*Math.log(u/(1-u));
  
  return lgstc;
}

/* Generate PDFs for the same distributions as above */

function norm_pdf(x, mu, sigma){
  return Math.exp(-Math.pow((x-mu),2)/(2*Math.pow(sigma,2)))/(sigma*Math.sqrt(2*Math.PI));
}

function exp_pdf(x, lambda){
  return (x < 0) ? 0 : lambda*Math.exp(-lambda*x);
}

function log_pdf(x, mu, sigma){
  power = -(x-mu)/sigma;
  numerator = Math.exp(power);
  denominator = sigma * Math.pow((1 + Math.exp(power)),2);
  return numerator / denominator;
}

function pareto_pdf(x, x_m, alpha){
  numerator = alpha*Math.pow(x_m,alpha);
  denominator =  Math.pow(x,alpha+1);
  return (x < x_m) ? 0 : numerator/denominator;
}

function gamma_pdf(x, beta, alpha){

 var gamma = 1;
 for (var i = alpha-1 ; i > 0 ;i --){
  gamma = gamma * i;
 }
 
 numerator = Math.pow(beta,alpha)*Math.pow(x,alpha-1)*Math.exp(-beta*x);
 denominator = gamma;

 return numerator / denominator;
 
}