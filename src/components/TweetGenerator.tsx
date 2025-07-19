import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Loader2, Wand2, Edit, Send, MessageSquare, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface TweetForm {
  idea: string;
  tone: string;
  style: string;
  length: number;
}

interface GeneratedTweet {
  content: string;
  characterCount: number;
}

const TweetGenerator = () => {
  const [form, setForm] = useState<TweetForm>({
    idea: "",
    tone: "",
    style: "",
    length: 240,
  });
  const [generatedTweet, setGeneratedTweet] = useState<GeneratedTweet | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const tones = [
    { value: "informal", label: "Informal" },
    { value: "professional", label: "Professional" },
    { value: "sarcastic", label: "Sarcastic" },
  ];

  const styles = [
    { value: "witty", label: "Witty" },
    { value: "motivational", label: "Motivational" },
    { value: "story-style", label: "Story-style" },
  ];

  const generateTweet = async () => {
    if (!form.idea.trim()) {
      toast({
        title: "Missing idea",
        description: "Please enter an idea for your tweet.",
        variant: "destructive",
      });
      return;
    }

    if (!form.tone || !form.style) {
      toast({
        title: "Missing details",
        description: "Please select both tone and style.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const prompt = `Write a tweet based on the idea '${form.idea}' in a ${form.tone} tone, ${form.style} style, and approximately ${form.length} characters long. Make it engaging and suitable for Twitter.`;

      const response = await fetch("/api/generate-tweet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          length: form.length,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to generate tweet");
      }

      const data = await response.json();
      
      if (!data.content) {
        throw new Error('No tweet content received from server');
      }
      
      const tweetContent = data.content.trim();
      
      // Apply hard limit of 280 characters
      const truncatedContent = tweetContent.length > 280 
        ? tweetContent.substring(0, 277) + '...' 
        : tweetContent;
      
      setGeneratedTweet({
        content: truncatedContent,
        characterCount: truncatedContent.length,
      });

      toast({
        title: "Tweet generated!",
        description: truncatedContent.length < tweetContent.length 
          ? "Tweet generated and truncated to fit Twitter's 280 character limit."
          : "Your AI-powered tweet is ready.",
      });
    } catch (error) {
      console.error("Error generating tweet:", error);
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Failed to generate tweet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEdit = () => {
    setGeneratedTweet(null);
  };

  const handleTweet = async () => {
    if (!generatedTweet) return;

    // Create Twitter web intent URL with pre-filled tweet content
    const tweetText = encodeURIComponent(generatedTweet.content);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    
    // Open Twitter in a new tab/window
    window.open(twitterUrl, '_blank');
    
    toast({
      title: "Opening Twitter! 🚀",
      description: "Your tweet is ready to post on Twitter.",
    });
    
    // Reset form after a short delay
    setTimeout(() => {
      setGeneratedTweet(null);
      setForm({
        idea: "",
        tone: "",
        style: "",
        length: 240,
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              XBot
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            Transform your ideas into engaging tweets with AI
          </p>
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            className="mt-4 text-gray-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>

        {!generatedTweet ? (
          /* Tweet Generation Form */
          <Card className="bg-gray-800/50 border-gray-700 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Wand2 className="h-5 w-5 text-cyan-400" />
                Create Your Tweet
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Idea Input */}
              <div className="space-y-2">
                <Label htmlFor="idea" className="text-sm font-medium text-gray-300">
                  Tweet Idea
                </Label>
                <Textarea
                  id="idea"
                  placeholder="What's your main idea? e.g., 'The importance of taking breaks during work'"
                  value={form.idea}
                  onChange={(e) => setForm({ ...form, idea: e.target.value })}
                  className="min-h-[100px] resize-none bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
                  rows={4}
                />
              </div>

              {/* Tone and Style */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-300">Tone</Label>
                  <Select value={form.tone} onValueChange={(value) => setForm({ ...form, tone: value })}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white focus:border-cyan-500 focus:ring-cyan-500">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {tones.map((tone) => (
                        <SelectItem key={tone.value} value={tone.value} className="text-white hover:bg-gray-700">
                          {tone.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-300">Style</Label>
                  <Select value={form.style} onValueChange={(value) => setForm({ ...form, style: value })}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white focus:border-cyan-500 focus:ring-cyan-500">
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {styles.map((style) => (
                        <SelectItem key={style.value} value={style.value} className="text-white hover:bg-gray-700">
                          {style.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Length Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-300">Character Length</Label>
                  <span className="text-sm text-gray-400 font-mono">
                    {form.length} chars
                  </span>
                </div>
                <Slider
                  value={[form.length]}
                  onValueChange={(value) => setForm({ ...form, length: value[0] })}
                  max={280}
                  min={50}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Short (50)</span>
                  <span>Perfect (240)</span>
                  <span>Max (280)</span>
                </div>
                <p className="text-xs text-gray-400 text-center">
                  AI will try to stay within {form.length} characters
                </p>
              </div>

              {/* Generate Button */}
              <Button
                onClick={generateTweet}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 shadow-lg"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Generate Tweet
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* Tweet Preview */
          <Card className="bg-gray-800/50 border-gray-700 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <MessageSquare className="h-5 w-5 text-cyan-400" />
                Tweet Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Tweet Display */}
              <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 space-y-3">
                <div className="text-gray-200 leading-relaxed">
                  {generatedTweet.content}
                </div>
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>Character count: {generatedTweet.characterCount}/280</span>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    generatedTweet.characterCount <= 280 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {generatedTweet.characterCount <= 280 ? 'Good length' : 'Too long'}
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={handleEdit}
                  variant="outline"
                  className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  onClick={handleTweet}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 shadow-lg"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Tweet it 🚀
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TweetGenerator;