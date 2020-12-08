# AngularTensorflowQnaDemo

This is an angular implementation of the tensorflow QNA Demo from: https://github.com/tensorflow/tfjs-models/tree/master/qna

Out of the box it will resolve the mobileBERT network from a preexisting content-delivery-network.

Its also possible to download and serve with the site by downloading the model and storing in 'assets' which gets reproduced in the dist directory when building the prod site.

When the model has been downloaded the **Ask Question** button will become visible.  Not all questions give answers so tries to call out when no answer is found.

The model returns the character start and end range from the context text but we don't implement the highlight yet.
