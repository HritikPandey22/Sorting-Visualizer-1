export const mergeSort = (array) => {
  const animations = [];

  if (array.length <= 1) return array;

  const auxArray = [...array];
  mergeSortHelper(array, 0, array.length - 1, animations, auxArray);
  return animations;
};

function mergeSortHelper(array, startIndex, endIndex, animations, auxArray) {
  if (startIndex == endIndex) return;
  let midIndex = Math.floor((startIndex + endIndex) / 2);
  mergeSortHelper(auxArray, startIndex, midIndex, animations, array);
  mergeSortHelper(auxArray, midIndex + 1, endIndex, animations, array);
  merge(auxArray, startIndex, midIndex, endIndex, animations, array);
}

function merge(auxArray, startIndex, midIndex, endIndex, animations, array) {
  let i = startIndex,
    j = midIndex + 1,
    k = startIndex;

  while (i <= midIndex && j <= endIndex) {
    //values at index i and j are getting compared
    animations.push([i, j]); //for changing the color;
    animations.push([i, j]); //for reverting the color changed

    if (auxArray[i] <= auxArray[j]) {
      animations.push([k, auxArray[i]]);
      array[k++] = auxArray[i++];
      // auxArray[k++] = auxArray[i++];
    } else {
      animations.push([k, auxArray[j]]);
      array[k++] = auxArray[j++];
      // auxArray[k++] = auxArray[j++];
    }
  }

  while (i <= midIndex) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxArray[i]]);
    array[k++] = auxArray[i++];
    // auxArray[k++] = auxArray[i++];
  }

  while (j <= endIndex) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxArray[j]]);
    array[k++] = auxArray[j++];
    // auxArray[k++] = auxArray[j++];
  }
}


////////////////////////////////////////////////////////////////

export function qsort(array){
  const animation = []
  const temp = [...array]

  sorting(temp, 0, array.length-1, animation)
  return animation
}

function sorting(array, l, r, animation) {
  if(l < r){
      let p = partition(array, l, r, animation)
      sorting(array, l, p, animation)
      sorting(array, p+1, r, animation)
  }
}

function partition(array, l, r, animation){
  let pivot = array[l];
  let i = l-1, j = r+1;

  while(true){
      do{
          i++;
          animation.push([i,l])
          animation.push([i,l])

      }while(array[i] < pivot);
      do{
          j--;

          animation.push([j,l])
          animation.push([j,l])

      }while(array[j] > pivot);

      if(i >= j){
          return j;
      }

      animation.push([i, j, array[i], array[j]])
      let a = array[i]
      array[i] = array[j]
      array[j] = a
  }
}



///////////////////////////////////////////////////////////////
export function heapsort(array){
  const animation = []
  const temp = [...array]

  heap(temp, array.length, animation)
  return animation
}
function heap(arr, n, animation){
  buildheap(arr, n, animation);
  for(let i=n-1; i>=1; i--){
      animation.push([0, i])
      animation.push([0, i])
      animation.push([0, i, arr[0], arr[i]])

      let temp = arr[i];
      arr[i] = arr[0]
      arr[0] = temp;

      maxheapify(arr, i, 0, animation)
  }
}
function buildheap(arr, n, animation){
  for(let i=(n-2)/2; i>=0; i--){
      maxheapify(arr, n, i, animation)
  }
}
function maxheapify(arr, n, i, animation){
  let large = i, left = 2*i+1, right = 2*i+2;
  if(left < n && arr[left] > arr[large]){
      const temp = [large, left]
      large = left;
      animation.push(temp);
      animation.push(temp);
  }
  if(right < n && arr[right] > arr[large]){
      const temp = [large, right]
      large = right;
      animation.push(temp);
      animation.push(temp);
  }

  if(large !== i){
      const temp = [i, large, arr[i], arr[large]]
      animation.push(temp)
      const t = arr[large]
      arr[large] = arr[i]
      arr[i] = t;
      maxheapify(arr, n, large, animation)
  }
}